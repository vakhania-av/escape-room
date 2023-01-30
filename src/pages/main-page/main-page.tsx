import { Helmet } from 'react-helmet-async';
import FilterForm from '../../components/filter-form/filter-form';
import Layout from '../../components/layout/layout';
import QuestsList from '../../components/quests-list/quests-list';
import { PageLink } from '../../const';
import { useAppSelector } from '../../hooks';
import { getQuests } from '../../store/quests/selectors';
import { getGenre, getLevel } from '../../store/ui/selectors';
import { getQuestsByGenre, getQuestsByLevel } from '../../utils/quest';

function MainPage(): JSX.Element {
  const levelFilterCurrent = useAppSelector(getLevel);
  const genreFilterCurrent = useAppSelector(getGenre);
  const quests = useAppSelector(getQuests);

  const questsByLevel = getQuestsByLevel(levelFilterCurrent, quests);
  const filteredQuests = getQuestsByGenre(genreFilterCurrent, questsByLevel);

  return (
    <>
      <Helmet>
        <title>EscapeRoom | Quests</title>
      </Helmet>
      <div className='wrapper'>
        <Layout page={PageLink.Quest}>
          <main className='page-content'>
            <div className='container'>
              <div className='page-content__title-wrapper'>
                <h1 className='subtitle page-content__subtitle'>
                  квесты в Санкт-Петербурге
                </h1>
                <h2 className='title title--size-m page-content__title'>
                  Выберите тематику
                </h2>
              </div>
              <div className='page-content__item'>
                <FilterForm />
              </div>
              <h2 className='title visually-hidden'>Выберите квест</h2>
              <QuestsList quests={filteredQuests} />
            </div>
          </main>
        </Layout>
      </div>
    </>
  );
}

export default MainPage;
