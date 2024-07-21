import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv('dataset/test_data.csv')

df = df.apply(pd.to_numeric, errors='ignore')

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    # Check if the 'prognosis' column has the value 'Hypertension'
    if row['prognosis'] == 'Hypertension':
        print(f"Row {index + 1}:")
        # Iterate over each column except 'prognosis'
        for col in df.columns[:-1]:  # Exclude the last column which is 'prognosis'
            # Check if the value in the current column for this row is 1
            if row[col] == 1 or row[col] == "1":
                print(f"{col}: {row[col]}")
        print()