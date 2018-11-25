const API_TOKEN = "f8496f2e205b71056fca42a71a48b23a";
const localhost = 'http://192.168.0.100:8080';
const distanthost = 'https://school-project-helsinki.herokuapp.com'

export function postLogin(username, password) {
  const user = { username: username, password: password };
  const url = localhost + '/api/login';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(user)
  })
    .then((response) => response)
    .catch((error) => console.error(error));;
}
/*****************************
 * Subjects Functions
 *****************************/

export function getSubjectsFromApi(jwtToken) {
  const url = localhost + '/api/subjects';
  return fetch(url, {
    headers : {
      Authorization : jwtToken
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getSubjectsFromStudentFromApi(id,jwtToken) {
  const url = localhost + '/api/subjectsOfStudent/' + id;
  return fetch(url, {
    headers : {
      Authorization : jwtToken
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getSubjectDetailFromApi(id,jwtToken) {
  const url = localhost + '/api/subject/' + id;
  return fetch(url, {
    headers : {
      Authorization : jwtToken
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function postSubjectFromApi(name, studentid,jwtToken) {
  const url = localhost + '/api/subject/';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization : jwtToken
    },
    body: JSON.stringify({
      name: name,
      studentid: studentid,
      average: 0
    }),
  });
}

export function putSubjectFromApi(subjectid, name,jwtToken) {
  const url = localhost + '/api/subject/';
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization : jwtToken
    },
    body: JSON.stringify({
      name: name,
      subjectid: subjectid
    }),
  });
}

export function deleteSubjectFromApi(subjectid,jwtToken) {
  const url = localhost + '/api/subject/' + subjectid;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization : jwtToken
    }
  });
}

/*****************************
 * Grade Functions
 *****************************/
export function getGradeDetailFromApi(id,jwtToken) {
  const url = localhost + '/api/grade/' + id;
  return fetch(url, {
    headers : {
      Authorization : jwtToken
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function postGradeFromApi(name, value, weight, subjectid,jwtToken) {
  const url = localhost + '/api/grade/';
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization : jwtToken
    },
    body: JSON.stringify({
      name: name,
      value: value,
      weight: weight,
      subjectid: subjectid
    }),
  });
}

export function putGradeFromApi(gradeid, name, value, weight,jwtToken) {
  const url = localhost + '/api/grade/';
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization : jwtToken
    },
    body: JSON.stringify({
      gradeid: gradeid,
      name: name,
      value: value,
      weight: weight
    }),
  });
}

export function deleteGradeFromApi(gradeid,jwtToken) {
  const url = localhost + '/api/grade/' + gradeid;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization : jwtToken,
      'Content-Type': 'application/json'
    }
  });
}

/*****************************
 * Student Functions
 *****************************/

export function getStudentFromApi(id,jwtToken) {
  const url = localhost + '/api/student/' + id;
  return fetch(url, {
    headers : {
      Authorization : jwtToken
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getStudentByUsernameFromApi(username,jwtToken) {
  const url = localhost + '/api/studentByUsername/' + username;
  return fetch(url, {
    headers : {
      Authorization : jwtToken
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

