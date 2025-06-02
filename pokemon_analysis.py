
import pandas as pd
import os
from supabase import create_client, Client
from pandasai import SmartDataframe
from pandasai.llm import OpenAI
from pandasai.helpers.logger import Logger

# === Supabase Configuration ===
# You can get these from your Supabase project settings
SUPABASE_URL = "https://buhtyylaoaopabawgvyy.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1aHR5eWxhb2FvcGFiYXdndnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzg4NDYsImV4cCI6MjA2Mzg1NDg0Nn0.liPWih124960qGMcxV-_WEKP4RUW1CTLJ2Bn7HRv_xs"

# === OpenAI API Key ===
# Set your OpenAI API key here or as an environment variable
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') or input("Enter your OpenAI API key: ")

# === Supabase Client ===
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# === Step 2: Initialize PandasAI with OpenAI ===
llm = OpenAI(api_token=OPENAI_API_KEY)

# === Pull Pokemon tables into DataFrames ===
def fetch_table(table_name):
    """Fetch data from Supabase table and convert to DataFrame"""
    try:
        response = supabase.table(table_name).select("*").execute()
        return pd.DataFrame(response.data)
    except Exception as e:
        print(f"Error fetching {table_name}: {e}")
        return pd.DataFrame()

# Fetch the Pokemon tables
print("Fetching Pokemon data from Supabase...")
pokemon_data = fetch_table("PokemonData")
battle_data = fetch_table("Pokemon_BattleTable")

print(f"Pokemon Data shape: {pokemon_data.shape}")
print(f"Battle Data shape: {battle_data.shape}")
print("Pokemon columns:", list(pokemon_data.columns))
print("Battle columns:", list(battle_data.columns))

# === Enhanced Data Merging ===
print("\nMerging Pokemon and Battle data...")

# Method 1: Start with battle data and add Pokemon info for each participant
if not battle_data.empty and not pokemon_data.empty:
    # First: Join to get info about First Pokemon
    df = pd.merge(battle_data, pokemon_data, 
                  left_on="First_pokemon", right_on="#", 
                  how="left", suffixes=('', '_Pokemon1'))
    
    # Second: Join to get info about Second Pokemon  
    df = pd.merge(df, pokemon_data,
                  left_on="Second_pokemon", right_on="#",
                  how="left", suffixes=('', '_Pokemon2'))
    
    # Third: Join to get info about Winner
    df = pd.merge(df, pokemon_data,
                  left_on="Winner", right_on="#",
                  how="left", suffixes=('', '_Winner'))
    
    # Clean up duplicate ID columns
    columns_to_drop = [col for col in df.columns if col.endswith('_Pokemon2') and col.replace('_Pokemon2', '') == '#']
    columns_to_drop.extend([col for col in df.columns if col.endswith('_Winner') and col.replace('_Winner', '') == '#'])
    df = df.drop(columns=columns_to_drop, errors='ignore')
    
    print(f"Merged data shape: {df.shape}")
    print("Available columns after merge:", list(df.columns))
    
else:
    # Fallback to just Pokemon data if battle data is empty
    df = pokemon_data
    print("Using Pokemon data only (no battle data available)")

# === Initialize PandasAI SmartDataframe ===
print("\nInitializing PandasAI...")
smart_df = SmartDataframe(
    df,
    config={
        "llm": llm,
        "custom_chart_engine": "plotly",
        "save_charts": True,
        "save_charts_path": "./charts",
        "verbose": True,
        "loggers": [Logger()]
    }
)

# === Interactive Chat Loop ===
print("\n🎮 Pokemon Data Analysis Chat")
print("Ask questions about Pokemon stats, battles, types, etc.")
print("Type 'quit' to exit\n")

# Example questions for users
example_questions = [
    "Show me a visualization for the top 3 types Charizard wins against",
    "What are the strongest Pokemon by total stats?",
    "Which Pokemon type has the highest average attack?",
    "Show me the distribution of legendary vs non-legendary Pokemon",
    "What's the win rate for each Pokemon type?",
    "Compare the stats of Fire, Water, and Grass type Pokemon"
]

print("Example questions you can ask:")
for i, q in enumerate(example_questions, 1):
    print(f"{i}. {q}")
print()

while True:
    try:
        # Get user input
        user_query = input("🧠 Your question: ").strip()
        
        if user_query.lower() in ['quit', 'exit', 'q']:
            print("Goodbye! 👋")
            break
            
        if not user_query:
            continue
            
        # Use PandasAI to answer the question
        print(f"\n🔍 Analyzing: {user_query}")
        print("⏳ Please wait...")
        
        response = smart_df.chat(user_query)
        
        print("\n🧠 PandasAI Response:")
        print("-" * 50)
        print(response)
        print("-" * 50)
        print()
        
    except KeyboardInterrupt:
        print("\n\nGoodbye! 👋")
        break
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Please try a different question.\n")

print("\nChart files (if any) saved to './charts/' directory")
