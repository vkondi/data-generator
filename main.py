import pandas as pd # For working with tabular data
from fastapi import FastAPI, Form # FastAPI framework for building APIs
from fastapi.responses import FileResponse # For sending files as response
from pydantic import BaseModel # For validating and parsing request body
from faker import Faker # For generating fake data
import os # For working with file paths

# Create a FastAPI instance
app = FastAPI()

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
    "number_range": lambda: faker.random_int(min=0, max=100), # Generate random number in a range
    "color": faker.color_name, # Generate random color name
    "url": faker.url, # Generate random URL
}

# Define the structure of request body for data generation
class DataRequest(BaseModel):
    fields: list[dict] # List of fields where each field has a name and type
    count: int # Number of records to generate
    
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
            field_type = field["type"]  # Get the type of the field
            generator = DATA_GENERATORS.get(field_type) # Get the corresponding data generator
            
            # Check if the field type is valid
            if not generator:
                return {"error": f"Unknown field type: {field_type}"}
            
            # Handle auto incrementing fields separately
            if field_type == "auto_increment":
                row[field_name] = generator(i + 1) # Pass the row index to the generator
            else:
                row[field_name] = generator() # Call the generator function and store the result
            
        records.append(row) # Add the generated record to the list of records
            
    # Return the generated records as response
    return {"data": records}