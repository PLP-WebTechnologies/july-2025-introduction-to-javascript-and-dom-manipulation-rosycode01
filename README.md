# Overview

TaskMaster is a responsive web application that allows users to create, manage, and track their tasks. It provides a clean interface with priority levels, filtering options, and statistics to help users stay organized and productive.

# Features

Add Tasks: Create new tasks with descriptions and priority levels

Task Management: Mark tasks as complete/incomplete, delete tasks

Priority System: Categorize tasks as High, Medium, or Low priority

Filtering: View tasks by status (all, active, completed) or priority

Statistics: Track total tasks, completed tasks, high priority tasks, and pending tasks

Bulk Actions: Mark all tasks as complete or active, clear completed tasks

Responsive Design: Works on both desktop and mobile devices

# File Structure

text
task-manager/
│
├── index.html # Main HTML document
├── styles.css # CSS styles for the application
└── script.js # JavaScript functionality

# Usage

## Adding Tasks

Type a task description in the input field

Select a priority level (High, Medium, or Low)

Click "Add Task" or press Enter

## Managing Tasks

Click "Complete" to mark a task as done

Click "Delete" to remove a task (with confirmation)

Use the filter buttons to view specific task categories

Use the quick action buttons for bulk operations

## Viewing Statistics

The statistics panel shows:

Total number of tasks

Number of completed tasks

Number of high priority tasks

Number of pending tasks

# JavaScript Concepts Demonstrated

Part 1: JavaScript Basics
Variables for storing task data

Conditional statements for input validation

Event handling for user interactions

Part 2: JavaScript Functions
Reusable functions for adding, completing, and deleting tasks

Helper functions for calculating statistics

Function parameters and return values

Part 3: JavaScript Loops
forEach() to iterate through tasks and render them

filter() to process task arrays based on criteria

Loops to update multiple tasks at once

Part 4: DOM Manipulation
Dynamically creating and updating HTML elements

Responding to user interactions (clicks, input)

Updating the UI based on application state
