import os

#Generate MD file for the Question


def create_markdown_file():
    print("🚀 Welcome to DSA Markdown Generator 🚀\n")
    
    # User Inputs
    problem_title = input("Enter problem title (e.g., Two Sum): ").strip()
    source = input("Enter source (e.g., LeetCode #1): ").strip()
    problem_statement = input("Enter problem statement: ").strip()
    understanding = input("Enter your understanding of the problem: ").strip()
    approach = input("Describe your approach step-by-step: ").strip()
    
    # Code input
    language = input("Enter programming language (python/cpp/java): ").strip().lower()
    print("Paste your code below (Type 'END' on a new line to finish):")
    
    code_lines = []
    while True:
        line = input()
        if line.strip().upper() == "END":
            break
        code_lines.append(line)
    
    code = "\n".join(code_lines)
    
    complexity = input("Enter time & space complexity: ").strip()
    edge_cases = input("List edge cases considered (comma separated): ").strip()
    
    markdown_content = f"""
# {problem_title} ({source}) 🔢

## Problem Statement
{problem_statement}

## Understanding 💡
{understanding}

## Approach 🚀
{approach}

## Code 🖥️
```{language}
{code}
```

## Complexity Analysis ⏳
**Time Complexity:** {complexity}  
**Space Complexity:** {complexity}

## Edge Cases 🔍
{', '.join(['✔️ ' + case.strip() for case in edge_cases.split(',')])}
"""

    # Generate file name
    safe_title = "_".join(problem_title.lower().split())
    file_name = f"{safe_title}.md"

    # Create directory if not exists
    output_dir = "striver-sheet-questions"
    os.makedirs(output_dir, exist_ok=True)
    file_path = os.path.join(output_dir, file_name)

    # Save the file
    with open(file_name, "w", encoding="utf-8") as file:
        file.write(markdown_content.strip())

    print(f"\n✅ Markdown file '{file_name}' created successfully!")

if __name__ == "__main__":
    create_markdown_file()
