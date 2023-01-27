import styles from './page-404.module.css';

const PageNotFound = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div className={styles.logo}>
      <span className="logo header__logo">
        <svg width="134" height="52" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </span>
    </div>
    <div className={styles.content}>
      <div className={styles.contentItem}>
        <h1>404 - Page Not Found</h1>
      </div>
      <div className={styles.contentItem}>
        <button>На главную</button>
      </div>
    </div>
  </div>
);

export default PageNotFound;
