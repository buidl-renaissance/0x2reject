import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/john?step=taste',
    permanent: true,
  },
});

export default function JohnKindOfManRedirect() {
  return null;
}
