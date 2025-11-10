
import Slides from './components/Slides.tsx';
import Categories from './components/Categories.tsx';
import NewPost from './components/NewPost.tsx';

export default function Home() {

  return (
    <div className="container mx-auto px-4 sm:px-6 xl:px-32 mt-8">
      <Slides />
      <Categories />
      {/* <Featured /> */}
      <NewPost />
    </div>
  );
}
