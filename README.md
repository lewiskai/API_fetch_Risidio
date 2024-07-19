# Post Management Application

This is a React-based post management application that allows users to view, add, edit, and delete posts. It uses Redux for state management and interacts with a mock API.

## Features

- View a list of posts
- Add new posts
- Edit existing posts
- Delete posts
- Filter posts by completion status and user ID
- Sort posts by title, user ID, or completion status

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)
* You have a Windows/Linux/Mac machine.

## Installing Post Management Application

To install the Post Management Application, follow these steps:

1. Clone the repository
```
git clone https://github.com/lewiskai/API_fetch_Risidio.git
```

2. Navigate to the project directory
```
cd post-management-app
```

3. Install the dependencies
```
npm install
```

## Using Post Management Application

To use the Post Management Application, follow these steps:

1. Start the development server
```
npm start
```

2. Open your web browser and visit `http://localhost:3000`

## Application Structure

- `src/components/`: Contains React components
- `PostList.tsx`: Displays the list of posts and handles filtering/sorting
- `PostForm.tsx`: Handles the creation of new posts
- `EditablePost.tsx`: Allows editing of existing posts
- `src/services/`: Contains API-related code
- `postsApi.ts`: Defines the API endpoints using Redux Toolkit Query
- `src/store/`: Contains Redux store configuration
- `index.ts`: Configures the Redux store and defines slices for local and API post management

## Main Functionalities

1. **Viewing Posts**: The application fetches and displays a list of posts from a mock API.
2. **Adding Posts**: Users can add new posts using the form at the top of the page.
3. **Editing Posts**: Each post can be edited by clicking the "Edit" button.
4. **Deleting Posts**: Posts can be deleted by clicking the "Delete" button.
5. **Filtering Posts**: Posts can be filtered by completion status and user ID using the dropdown menus.
6. **Sorting Posts**: Posts can be sorted by clicking on the table headers.

## Contributing to Post Management Application

To contribute to the Post Management Application, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.