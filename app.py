import pandas as pd # For working with tabular data
from fastapi import FastAPI, Form # FastAPI framework for building APIs
from fastapi.responses import FileResponse # For sending files as response
from pydantic import BaseModel # For validating and parsing request body
from faker import Faker # For generating fake data
import os # For working with file paths