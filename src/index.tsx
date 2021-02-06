import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export enum CardPositions {
  topLeft = 'topLeft',
  topRight = 'topRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'topRight',
}

type Page = {
  position: number;
  image: {
    src: string;
    blurred: boolean;
  };
  card: {
    component: ReactNode;
    position: CardPositions;
  };
  highlightPosition?: { width: number; height: number; x: number; y: number };
};

type Pages = { [key: string]: Page };

type Definition = {
  pages: Pages;
  leadCaptureHandler: any;
};

export interface VagabondProps extends HTMLAttributes<HTMLDivElement> {
  definition: Definition;
}

const pathFromString = (str: string) => `/${str}`;

const arraysAreEqual = (arrOne: number[], arrTwo: number[]): boolean => {
  if (arrOne.length !== arrTwo.length) return false;
  for (const i = 0; i < arrOne.length; i++) {
    if (arrOne[i] !== arrTwo[i]) return false;
  }
  return true;
};

type PagePath = {
  path: string;
  exact: boolean;
  Component: ReactNode;
  previousPath?: string;
  nextPath?: string;
};

const buildPathsFromPages = (pages: Pages) => {
  const positions = Object.values(pages).map((v) => v.position);
  const numberOfPositions = positions.length;

  const positionsAreValid = arraysAreEqual(
    positions,
    Array(numberOfPositions)
      .fill()
      .map((_, index) => index + 1)
  );

  if (!positionsAreValid) {
    throw new Error('Invalid positions specified');
  }

  const sortedPages = Object.entries(pages).sort(
    (a, b) => a[1].position > b[1].position
  );

  const routePaths: PagePath[] = sortedPages.reduce((acc, [page, data], i) => {
    const previousPage = sortedPages[i - 1];
    const nextPage = sortedPages[i + 1];

    const pageObject = {
      path: i === 0 ? pathFromString('') : pathFromString(page),
      exact: i === 0,
      Component: data.card.component,
      previousPath: previousPage ? pathFromString(previousPage[0]) : null,
      nextPath: nextPage ? pathFromString(nextPage[0]) : null,
    };

    acc.push(pageObject);

    return acc;
  }, []);

  return routePaths;
};

export const Vagabond: FC<VagabondProps> = (props) => {
  const routePaths = buildPathsFromPages(props.definition.pages);
  return (
    <BrowserRouter>
      <Switch>
        {routePaths.map((p) => (
          <Route key={p.path} path={p.path} exact={p.exact}>
            <p.Component />
          </Route>
        ))}
        <Route>
          <p>Page not found</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
