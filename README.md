# Next.js Boilerplate

**Next.js Boilerplate** is a starter template designed to simplify the development of Next.js applications. It provides a complete setup with essential features and best practices, enabling developers to focus on building their applications without the need to configure foundational elements from scratch.

---

## Run the Application

1. **Clone the backend repository**:

   ```bash
   npm ci
   ```

2. **Launch the backend development server**:

   ```bash
   npm start
   ```

3. **Clone the frontend repository**:

   ```bash
   npm ci
   ```

4. **Launch the frontend development server**:

   ```bash
   npm run dev
   ```

5. Access the application by visiting [http://localhost:3001](http://localhost:3001) in your web browser.

---

## Rationale Behind Technology Choices

The selection of **Next.js Boilerplate** as the foundational framework for this project was driven by its robust capabilities as a starting point for Next.js applications. Below are the technologies utilized within this boilerplate, along with their unique benefits:

- **Next.js**: Esteemed in the React ecosystem, it excels in server-side rendering and static site generation, significantly enhancing performance and search engine optimization (SEO).
- **Material UI**: A popular UI framework in the React community, offering a comprehensive set of components that adhere to Material Design standards, ensuring a cohesive and visually appealing user experience.
- **React Query**: Chosen for its advanced data-fetching and state management features, React Query simplifies the handling of asynchronous requests and optimizes server state synchronization and caching, improving overall app performance.
- **Zod**: Utilized for robust schema validation, Zod is a TypeScript-first library that enhances type safety, ensuring data conforms to defined schemas while providing clear error handling and enhancing code quality.
- **React Hook Form**: Integrated for efficient form state management, its lightweight approach minimizes re-renders, which is especially beneficial for handling complex forms.
- **React Hook Form MUI**: This integration layer seamlessly connects React Hook Form with Material UI components, ensuring an optimal user experience while preserving validation and performance advantages.

---

## Challenges Encountered

- **CORS Issues**: While fetching data from the API, I encountered a CORS issue, which was resolved by adjusting the settings in `next.config.ts`.
- **Managing Async Operations**: I implemented **React Query** to effectively manage asynchronous data fetching for the Todo list, enhancing data handling and state management.
- **Form Validation**: I utilized **React Hook Form MUI** for form validation. Despite its usability, I faced challenges due to insufficient documentation regarding custom validation rules, but I successfully implemented custom validations for the Title and Tags fields.
- **Type Mismatches in Data**: During form submission, I encountered difficulties with Tag and Deadline fields due to mismatched data types. I devised innovative solutions to resolve these discrepancies.
- **Custom Badge Component**: I developed a custom badge component using the **Chip** component from Material UI, as the existing options did not meet my specific requirements.
