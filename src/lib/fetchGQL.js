function fetchGQL(operationsDoc, variables = {}) {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
}

function fetchStaticGQL(operationsDoc, variables = {}) {
  const endpoint = process.env.HASURA_GRAPHQL_URL
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
}

export { fetchGQL, fetchStaticGQL };