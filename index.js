
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  
  function getLearnerData(course, ag, submissions) {
    if (ag.course_id !== course.id) {
      return "Error: AssignmentGroup.";
    }
  
    const results = {};
  
    submissions.forEach(({ learner_id, assignment_id, submission }) => {
      const assignment = ag.assignments.find(a => a.id === assignment_id);
      if (!assignment) return; 
  
      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(submission.submitted_at);
      let score = submission.score;
  
      if (submittedDate > dueDate) {
        score *= 0.9; 
      }
      if (!results[learner_id]) {
        results[learner_id] = { id: learner_id, totalScore: 0, totalPossible: 0 };
      }
  
      results[learner_id].totalScore += score;
      results[learner_id].totalPossible += assignment.points_possible;
      results[learner_id][assignment_id] = score / assignment.points_possible; 
    });
  
    return Object.values(results).map(learner => ({
      id: learner.id,
      avg: (learner.totalScore / learner.totalPossible) || 0,
      ...learner 
    }));
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);







