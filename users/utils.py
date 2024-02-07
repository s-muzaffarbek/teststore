import re

def clear_phone_number(phoneStr: str):
    return re.sub("[+\s]", "", phoneStr)