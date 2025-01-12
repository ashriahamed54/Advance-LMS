export const courseData = {
  1: {
    id: 1,
    title: 'Introduction to Computer Science',
    description: 'Learn the basics of computer science and programming.',
    instructor: 'Dr. Jane Smith',
    instructorId: 'jane-smith',
    progress: 60,
    modules: [
      { id: 1, title: 'What is Computer Science?', completed: true },
      { id: 2, title: 'Introduction to Programming', completed: true },
      { id: 3, title: 'Data Types and Variables', completed: false },
      { id: 4, title: 'Control Structures', completed: false },
    ],
    assignments: [
      { id: 1, title: 'Hello World Program', dueDate: '2023-06-15', submitted: true, file: 'hello_world.py' },
      { id: 2, title: 'Variables Quiz', dueDate: '2023-06-20', submitted: false, file: null },
    ],
    resources: [
      { id: 1, title: 'Course Syllabus', type: 'pdf' },
      { id: 2, title: 'Programming Basics Cheat Sheet', type: 'doc' },
    ],
  },
  2: {
    id: 2,
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development, including HTML, CSS, and JavaScript.',
    instructor: 'Prof. John Doe',
    instructorId: 'john-doe',
    progress: 40,
    modules: [
      { id: 1, title: 'Introduction to HTML', completed: true },
      { id: 2, title: 'CSS Basics', completed: true },
      { id: 3, title: 'JavaScript Fundamentals', completed: false },
      { id: 4, title: 'Responsive Web Design', completed: false },
    ],
    assignments: [
      { id: 1, title: 'Personal Portfolio', dueDate: '2023-06-22', submitted: false, file: null },
      { id: 2, title: 'JavaScript Quiz', dueDate: '2023-06-25', submitted: false, file: null },
    ],
    resources: [
      { id: 1, title: 'Web Dev Roadmap', type: 'pdf' },
      { id: 2, title: 'HTML5 Cheat Sheet', type: 'doc' },
    ],
  },
  3: {
    id: 3,
    title: 'Advanced Algorithms',
    description: 'Dive deep into complex algorithms and data structures.',
    instructor: 'Dr. Jane Smith',
    instructorId: 'jane-smith',
    progress: 75,
    modules: [
      { id: 1, title: 'Graph Algorithms', completed: true },
      { id: 2, title: 'Dynamic Programming', completed: true },
      { id: 3, title: 'NP-Complete Problems', completed: false },
      { id: 4, title: 'Approximation Algorithms', completed: false },
    ],
    assignments: [
      { id: 1, title: 'Graph Algorithm Implementation', dueDate: '2023-06-18', submitted: true, file: 'graph_algo.py' },
      { id: 2, title: 'Dynamic Programming Challenge', dueDate: '2023-06-23', submitted: false,file: null },
    ],
    resources: [
      { id: 1, title: 'Algorithm Design Manual', type: 'pdf' },
      { id: 2, title: 'Big-O Cheat Sheet', type: 'doc' },
    ],
  },
};

