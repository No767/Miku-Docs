import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple to use',
    Svg: require('@site/static/img/undraw-assets/simple.svg').default,
    description: (
      <>
        Miku was designed to be simple to use. There are no complicated steps to getting Miku
        fully set up the way you want it to be.
      </>
    ),
  },
  {
    title: 'Tons of features',
    Svg: require('@site/static/img/undraw-assets/features.svg').default,
    description: (
      <>
        Miku contains a ton of features, from a custom XP system, to gachas system, and many many more.
      </>
    ),
  },
  {
    title: 'Completely Open Source and Free',
    Svg: require('@site/static/img/undraw-assets/git.svg').default,
    description: (
      <>
        Miku has always been built from the ground up as open source software.
        Miku is licensed under Apache-2.0
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
