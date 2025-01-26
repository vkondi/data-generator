import logging
import pandas as pd # For working with tabular data
from fastapi import FastAPI, HTTPException, BackgroundTasks # FastAPI framework for building APIs
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse # For sending files as response
from pydantic import BaseModel # For validating and parsing request body
from faker import Faker # For generating fake data
import os # For working with file paths
from typing import Optional, Literal
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a FastAPI instance
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
    "email": faker.email, # Generate random email
    "date": faker.date, # Generate random date
    "time": faker.time, # Generate random time
    "company": faker.company, # Generate random company name
    "constant": lambda: "Constant Value", # Generate constant value
    "list": lambda: faker.random_element(["A", "B", "C"]), # Generate random element from list
    "alphanumeric": faker.bothify, # Generate a random alphanumeric string
    "boolean": faker.boolean, # Generate random boolean value
    "auto_increment": lambda n: n, # Generate auto incrementing number
    "number": lambda: faker.random_int(min=0, max=100), # Generate random number in a range
    "color": faker.color_name, # Generate random color name
    "url": faker.url, # Generate random URL
}

# Define the structure of request body for data generation
class DataRequest(BaseModel):
    fields: list[dict] # List of fields where each field has a name and dataType
    count: int # Number of records to generate
    file_format: Optional[Literal["csv", "json", "xlsx", "xml", "html"]] = "csv" # File format to export the data

@app.get("/get-config")
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
    return {"data": records}

@app.post("/export")
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
    df = pd.DataFrame(records["data"])
    
    # Get the requested file format and convert it to lowercase
    file_format = data_request.file_format.lower()
    
    # Get the current date and time
    current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    # Define the file name based on the requested format
    file_name = f"generated_data_{current_datetime}.{file_format}"
    temp_dir = os.path.join(os.getcwd(), 'temp')
    file_path = os.path.join(temp_dir, file_name)
    
    # Ensure the directory exists
    os.makedirs(temp_dir, exist_ok=True)
    
    # Convert the data to the requested file format
    if file_format == "csv":
        df.to_csv(file_path, index=False, encoding='utf-8') # save as csv without index and specify encoding
    elif file_format == "json":
        df.to_json(file_path, orient="records", force_ascii=False) # save as a JSON file with records format and specify encoding
    elif file_format == "xlsx":
        df.to_excel(file_path, index=False)
    elif file_format == "xml":
        df.columns = [col.replace(" ", "_") for col in df.columns] # Replace spaces with underscores in column names
        df.to_xml(file_path, root_name="data", row_name="record")
    elif file_format == 'html':
        df.to_html(file_path, index=False)
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported file format: {file_format}")
    
    logger.info(f"\nfile_format: {file_format}\file_name: {file_name}")
    
    # Add a background task to delete the file after sending it
    background_tasks.add_task(os.remove, file_path)
    
    # Return the generated file as response
    return FileResponse(file_path, media_type="application/octet-stream", filename=file_name, headers={"Content-Disposition": f"attachment; filename={file_name}"})