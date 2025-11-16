import Panel from './components/panel';
import Goods from './components/goods';
import Content from './components/content';
import Header from './components/header';

const App = () => {
  return (
    <>
      <div className="w-100vw h-100vh">
        <div>
          <Header />
        </div>
        <div className="flex h-[calc(100vh-60px)]">
          <Goods />
          <Content />
          <Panel />
        </div>
      </div>
    </>
  );
};

export default App;
