import { Helmet } from "react-helmet-async";

const MainPage = (): JSX.Element => (
  <>
    <Helmet>EscapeRoom | Main</Helmet>
    <div class="wrapper">
      <Layout>
        <main class="page-content">
          <div class="container">
            <div class="page-content_title-wrapper">
              <h1 class="subtitle page-content_subtitle">квесты в Санкт-Петербурге</h1>
              <h2 class="title title--size-m page-content_title">Выберите тематику</h2>
            </div>
            <div class="page-content_item">Filter Form</div>
            <h2 className="title visually-hidden">Выберите квест</h2>
            QuestsList
          </div>
        </main>
      </Layout>
    </div>
  </>
);

export default MainPage;
