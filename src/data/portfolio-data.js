export const experiences = [
  {
    role: 'Software Engineer II',
    company: 'Head Digital Works Pvt. Ltd.',
    dates: 'Apr 2025 - Sep 2025 (6 mos)',
    location: 'Hyderabad, Telangana, India',
    points: [
      'Built scalable, low-latency backend systems (Java 21, Spring Boot, Cassandra) supporting 10M+ users.',
      'Reduced p99 latency from 65s to 2.5s via virtual threads and IOPS optimization.',
      'Implemented RESTful APIs, JWT/OAuth2 authentication, and role-based access control.',
      'Integrated RabbitMQ for an event-driven architecture, processing 60K+ events/minute.',
      'Deployed microservices with CI/CD pipelines, ensuring high availability and fault tolerance.',
    ],
    skills: ['Back-End', 'Distributed Systems', 'Java', 'Spring Boot', 'DBMS']
  },
  {
    role: 'Software Engineer I',
    company: 'Head Digital Works Pvt. Ltd.',
    dates: 'Jul 2024 - Mar 2025 (9 mos)',
    location: 'Hyderabad, Telangana, India',
    points: [
      'Developed a React.js + Tailwind CSS admin console, improving team efficiency and boosting user retention by 5%.',
      'Collaborated on end-to-end features with seamless frontend-backend integration.',
      'Gained hands-on experience in designing and deploying Kubernetes applications through certification.',
    ],
    skills: ['Front-End', 'Back-End', 'React.js', 'JavaScript', 'Kubernetes']
  },
  {
    role: 'Teaching Assistant',
    company: 'IIIT Hyderabad (IIITH)',
    dates: 'Aug 2023 - Jan 2024 (6 mos)',
    location: 'Hyderabad, Telangana, India',
    points: [
      'Teaching Assistant for the course Data Structures & Algorithms for Problem Solving.',
      'Mentored over 120+ students in DSA.',
      'Conducted tutorials, created online assessments, and ensured academic integrity.',
    ],
    skills: ['DSA', 'Mentoring', 'Problem Solving']
  },
];

export const projects = [
  {
    title: 'Insight Engine',
    description: 'Implemented a RAG pipeline using LangChain and OpenAI, transforming static web articles into interactive, conversational AI systems. Indexed embeddings in ChromaDB for sub-second retrieval and used LangGraph for accurate, source-grounded responses.',
    github: 'https://github.com/Aman-2110/Insight-Engine',
    tags: ['Generative AI', 'LangChain', 'OpenAI', 'RAG', 'ChromaDB', 'LangGraph', 'Python', 'Flask', 'Redis']
  },
  {
    title: 'WikiSearch: Wikipedia Search Engine',
    description: 'Built a high-performance search engine on a 90GB Wikipedia corpus, delivering sub-3-second query responses. Implemented TF-IDF relevance scoring and optimized indexing with K-way merge and multithreading.',
    github: 'https://github.com/Aman-2110/WikiSearch',
    tags: ['Search Engine', 'TF-IDF', 'Python', 'Data Structures', 'Algorithms']
  },
  {
    title: 'Distributed Mutual Exclusion',
    description: 'Implemented Ricart-Agarwala algorithm for distributed mutual exclusion with asynchronous message passing and logical clocks. Designed failure detection using heartbeat/timeouts and developed recovery protocols for node failures. Enabled seamless integration of new nodes while ensuring protocol adherence and fault-tolerant behavior.',
    github: 'https://github.com/Aman-2110/ricart-agarwala-distributed-mutex/',
    tags: ['Distributed Systems', 'Sockets', 'TCP/UDP', 'Fault Tolerance', 'System Design']
  },
  {
      title: 'MAGNET: Graph Neural Network Classifier',
      description: 'Led the development of a Multi-Label Text Classification system using Graph Neural Networks. Implemented advanced techniques combining GloVe and BERT embeddings with BiLSTM layers and attention mechanism. Demonstrated superior performance through comprehensive comparisons with classical and modern text classification models.',
      github: 'https://github.com/Aman-2110/MAGNET',
      tags: ['PyTorch', 'GNN', 'BERT', 'NLP', 'Deep Learning', 'Attention', 'BiLSTM', 'GloVe']
    },
  {
    title: 'Personal Portfolio',
    description: 'This very website! A fully responsive portfolio built from scratch using React.js and Tailwind CSS, featuring a custom cursor and a clean, dark-mode design.',
    github: 'https://github.com/Aman-2110/Portfolio-Website', // Placeholder, link to main profile
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Responsive Design', 'RAG Integration']
  },
  {
    title: 'Blog',
    description: 'Coming Soon! I am currently working on writing articles about System Design, DSA, and my journey with Generative AI. Stay tuned!',
    github: null,
    tags: ['Coming Soon', 'Writing']
  },
    
  ];