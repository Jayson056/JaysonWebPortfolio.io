import requests
from flask import Flask, render_template

app = Flask(__name__)

GITHUB_USERNAME = "Jayson056"

@app.route('/')
def index():
    try:
        # Fetch repos from GitHub API
        response = requests.get(f"https://api.github.com/users/{GITHUB_USERNAME}/repos?sort=updated&per_page=100")
        repos = response.json()
        
        # Ensure it's a list (GitHub API might return an error dict)
        if not isinstance(repos, list):
            repos = []
            
        # Filter out forks if desired, or keep all
        # repos = [r for r in repos if not r['fork']]
        
    except Exception as e:
        print(f"Error fetching repos: {e}")
        repos = []
        
    return render_template('index.html', repos=repos)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000)

