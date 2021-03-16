import * as React from 'react';
import { fetchGQL } from '@lib/fetchGQL';
import { useMutation, useQueryClient } from 'react-query';
import { gql } from 'graphql-request';

import { Flex, Input, Textarea, Button } from '@chakra-ui/react';

const createPostMutation = gql`
  mutation createPost($object: posts_insert_input!) {
    insert_posts_one(object: $object) {
      id 
      title
      body    
      created_at
    } 
  }
`

export default function PostForm() {
  const queryClient = useQueryClient();
  const [body, setBody] = React.useState('');
  const [title, setTitle] = React.useState('');

  const bodyInputRef = React.useRef();
  const titleInputRef = React.useRef();

  const createPost = useMutation((post) => fetchGQL(createPostMutation, { object: { ...post } }), {
    onMutate: async (post) => {
      setBody('');
      setTitle('')
      bodyInputRef.current.value = '';
      titleInputRef.current.value = '';
      await queryClient.cancelQueries('posts');
      const previousValue = queryClient.getQueryData('posts');

      queryClient.setQueryData('posts', (old) => ({
        ...old,
        posts: [...old.posts, post],
      }));

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      // TODO: Revisit and add a toast on failure and rollback
      queryClient.setQueryData('posts', previousValue),
    // After success or failure, refetch the notes query
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  return (
    <Flex direction="column" mt={5}>
      <Input ref={titleInputRef} onChange={e => setTitle(e.target.value)} placeholder="Title" size="sm" />
      <Textarea ref={bodyInputRef} onChange={e => setBody(e.target.value)} placeholder="Body" size="sm" />
      <Button onClick={() => createPost.mutate({ body, title })}>Save</Button>
    </Flex>
  )
}