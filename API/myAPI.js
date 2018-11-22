const API_TOKEN = "f8496f2e205b71056fca42a71a48b23a";
const localhost = 'http://192.168.0.100:8080';
const Distanthost = 'https://school-project-helsinki.herokuapp.com'

export function getSubjectsFromApi() {
  const url = localhost + '/api/subjects';
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getSubjectsFromStudentFromApi(id) {
  const url = localhost + '/api/subjectsOfStudent/' + id;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

// Récupération du détail d'un sujet
export function getSubjectDetailFromApi(id) {
  const url = localhost + '/api/subject/' + id;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getGradeDetailFromApi(id) {
  const url = localhost + '/api/grade/' + id;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getStudentFromApi(id) {
  const url = localhost + '/api/student/' + id;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function postStudentFromApi(name, studentid) {
  const url = localhost + '/api/subject/';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      studentid: studentid,
      average: 0
    }),
  });
}

export function deleteStudentFromApi(subjectid) {
  const url = localhost + '/api/subject/' + subjectid;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}
