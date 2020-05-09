import { useRouter } from "next/router";

const SamplePage = () => {
  const router = useRouter();
  const { date, photographer, title, picture } = router.query || [];

  return (
    <>
      <h4>Date: {date}</h4>
      <h3>Photographer: {photographer}</h3>
      <h2>Title: {title}</h2>
      <img src={picture}></img>
    </>
  );
};

export default SamplePage;
