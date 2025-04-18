import logging
import pandas as pd # For working with tabular data
from fastapi import FastAPI, HTTPException, BackgroundTasks # FastAPI framework for building APIs
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse # For sending files as response
from pydantic import BaseModel # For validating and parsing request body
from faker import Faker # For generating fake data
from typing import Optional, Literal
from datetime import datetime
from fastapi.staticfiles import StaticFiles
import io

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a FastAPI instance
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

# Create a Faker instance for generating fake data
faker = Faker()

# Define a dictionary mapping field types to their corresponding data generators
DATA_GENERATORS = {
    "name": faker.name, # Generate random name
    "phone": faker.phone_number, # Generate random phone number
    "number": lambda: faker.random_int(min=10000, max=100000), # Generate random number in a range
    "boolean": faker.boolean, # Generate random boolean value
    "date": faker.date, # Generate random date
    "email": faker.email, # Generate random email
    "time": faker.time, # Generate random time
    "address": faker.address, # Generate random address
    "city": faker.city, # Generate random city name
    "country": faker.country, # Generate random country name
    "zipCode": faker.zipcode, # Generate random ZIP code
    "company": faker.company, # Generate random company name
    "jobTitle": faker.job, # Generate random job title
    "color": faker.color_name, # Generate random color name
    "uuid": faker.uuid4, # Generate random UUID
    "url": faker.url, # Generate random URL
    "ipAddress": faker.ipv4, # Generate random IP address
    "macAddress": faker.mac_address, # Generate random MAC address
    "constant": lambda: "Constant Value", # Generate constant value
    "list": lambda: faker.random_element(["A", "B", "C"]), # Generate random element from list
    "alphanumeric": faker.bothify, # Generate a random alphanumeric string
    "auto_increment": lambda n: n, # Generate auto incrementing number
}

# Define the structure of request body for data generation
class DataRequest(BaseModel):
    fields: list[dict] # List of fields where each field has a name and dataType
    count: int # Number of records to generate
    file_format: Optional[Literal["csv", "json", "xlsx", "xml", "html"]] = "csv" # File format to export the data

@app.get("/api/get-config")
def getConfig():
    """
    Get the configurations for generating data
    """
    return { "message": "success", "allowedDataTypes": list(DATA_GENERATORS) }
    
@app.post("/generate")
def generate(data_request: DataRequest):
    """
    Generate data based on the provided fields and count
    """
    records = [] # Initialize an empty list to store generated records
    
    # Loop through the number of records to generate
    for i in range(data_request.count):
        row = {} # Create a dictionary to store the generated data for each record
        
        # Process each field in the request
        for field in data_request.fields:
            field_name = field["name"] # Get the name of the field
            field_type = field["dataType"]  # Get the type of the field
            generator = DATA_GENERATORS.get(field_type) # Get the corresponding data generator
            
            # Check if the field type is valid
            if not generator:
                valid_types = ", ".join(DATA_GENERATORS.keys())
                return {"error": f"Unknown field type: {field_type}. Valid types are: {valid_types}"}
            
            # Handle auto incrementing fields separately
            if field_type == "auto_increment":
                row[field_name] = generator(i + 1) # Pass the row index to the generator
            else:
                row[field_name] = generator() # Call the generator function and store the result
            
        records.append(row) # Add the generated record to the list of records
            
    # Return the generated records as response
    return records

@app.post("/api/export")
def export_data(data_request: DataRequest, background_tasks: BackgroundTasks):
    """
    Generate and export data to a file in the specified format
    """
    
    # Generate data based on the request
    records = generate(data_request)
    
    # Check if the data generation was successful
    if "error" in records:
        return records
    
    # Convert the generated data to a DataFrame
    df = pd.DataFrame(records)
    
    # Get the requested file format and convert it to lowercase
    file_format = data_request.file_format.lower()
    
    # Use an in-memory buffer for storing file content
    buffer = io.BytesIO() if file_format == "xlsx" else io.StringIO()
    
    # Convert the data to the requested file format
    if file_format == "csv":
        df.to_csv(buffer, index=False, encoding='utf-8') # save as csv without index and specify encoding
        media_type = "text/csv"
        extension = "csv"
    elif file_format == "json":
        df.to_json(buffer, orient="records", force_ascii=False) # save as a JSON file with records format and specify encoding
        media_type = "application/json"
        extension = "json"
    elif file_format == "xlsx":
        with pd.ExcelWriter(buffer, engine="xlsxwriter") as writer:
            df.to_excel(writer, index=False)  # Save as Excel file without index
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        extension = "xlsx"
    elif file_format == "xml":
        df.columns = [col.replace(" ", "_") for col in df.columns]  # Replace spaces with underscores in column names
        xml_data = df.to_xml(root_name="data", row_name="record", encoding="utf-8")  # Generate XML as bytes
        xml_data = xml_data.decode("utf-8") if isinstance(xml_data, bytes) else xml_data  # Ensure it's a string
        buffer.write(xml_data)  # Write string data to in-memory buffer
        media_type = "application/xml"
        extension = "xml"
    elif file_format == 'html':
        df.to_html(buffer, index=False)
        media_type = "text/html"
        extension = "html"
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported file format: {file_format}")
    
    # Reset buffer pointer to the start
    buffer.seek(0)
    
    # Define the file name based on the current date and time
    file_name = f"generated_data_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.{extension}"
    
    logger.info(f"\nfile_name: {file_name}")
    
    # Return the generated file as response
    return StreamingResponse(buffer, media_type=media_type, headers={
        "Content-Disposition": f"attachment; filename={file_name}"
    })

# Mount the React build directory for default route
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")
