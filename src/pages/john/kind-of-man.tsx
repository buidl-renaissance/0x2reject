import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/john/about',
    permanent: true,
  },
});

export default function JohnKindOfManRedirect() {
  return null;
}
