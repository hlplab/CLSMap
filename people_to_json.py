#!/usr/bin/env python3


from __future__ import print_function
import pandas as pd

people = pd.read_csv('CLSList.tsv',sep='\t')

names = pd.DataFrame(people.Name.str.split(',').tolist(), columns = ['LastName', 'FirstName'])
people_merged = pd.concat([people, names], axis=1)
renames = {
    'Name': 'name',
    'Type of Trainee': 'training',
    'Area of study': 'area',
    'Advisor': 'advisor',
    'Year Graduated': 'gradyear',
    'Current Position': 'position',
    'Latitude': 'lat',
    'Longitude': 'long',
    'URL': 'url',
    'LastName': 'lastname',
    'FirstName': 'firstname'
}
people_merged.rename(columns=renames, inplace=True)
people_merged.to_json('people.json', orient='records', force_ascii=False)
