import { Level, SortByLevelType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLevel } from '../../store/ui/selectors';
import { changeLevel } from '../../store/ui/ui';

function FilterLevelForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const levelFilterCurrent = useAppSelector(getLevel);

  const handleInputChange = (level: Level) => dispatch(changeLevel({ level }));

  return (
    <ul className='filter__list'>
      {Object.values(SortByLevelType).map((value) => {
        const { id, title } = value;
        const isChecked = (id === levelFilterCurrent);

        return (
          <li className='filter__item' key={id}>
            <input
              type='radio'
              id={id}
              name='level'
              checked={isChecked}
              onChange={() => handleInputChange(id)}
            />
            <label className='filter__label' htmlFor={id}>
              <span className='filter__label-text'>{title}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default FilterLevelForm;
