import LogIn from "./LogIn";
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <div className="page-background">
        <figcaption class="img-caption">
          Photo from{" "}
          <a href="https://unsplash.com/photos/brown-wooden-house-near-green-trees-and-mountain-during-daytime-lXOktFA9Y_4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Roger Lipera
          </a>
        </figcaption>
        <LogIn />
      </div>
    </>
  );
};

export default Home;
