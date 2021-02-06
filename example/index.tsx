import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';
import { CardPositions, Vagabond } from '../src';

const IntroductionCard = () => <div>introduction</div>;
const MiddleCard = () => <div>middle</div>;
const EndCard = () => <div>end</div>;

const definition = {
  pages: {
    introduction: {
      position: 1,
      image: {
        src: '',
        blurred: true,
      },
      card: { component: IntroductionCard, position: CardPositions.topRight },
      highlightPosition: { width: 50, height: 50, x: 10, y: 10 },
    },
    middle: {
      position: 2,
      image: {
        src: '',
        blurred: true,
      },
      card: { component: MiddleCard, position: CardPositions.topRight },
      highlightPosition: { width: 50, height: 50, x: 10, y: 10 },
    },
    end: {
      position: 3,
      image: {
        src: '',
        blurred: false,
      },
      card: { component: EndCard, position: CardPositions.bottomLeft },
    },
  },
  leadCaptureHandler: () => console.log('Func'),
};

const App = () => {
  return (
    <div>
      <Vagabond definition={definition} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
