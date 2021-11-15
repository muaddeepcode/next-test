import React, {useState, useEffect, useRef} from 'react';
import styles from '../styles/Demo.module.scss';


const Demo = () => {

  const ITEMS_TOTAL = 100;

  const [state, setState] = useState({
    items: [],
    opacity: 0,
    currentPage: 1,
    maxPage: 0
  });

  const gridRef = useRef(null);


  useEffect(()=>{
    fakeGetItems();
    setTimeout(()=>{
      setState(state => ({
        ...state,
        maxPage: Math.ceil(gridRef.current.offsetHeight / window.innerHeight) - 1
      }))
    }, 500)
  }, []);


  /**
   * ВАЖНО: в этой функции не нужно искать ошибки.
   * Это просто имитация полученя каких-то данных через какой-нибудь axios.
   * Опустим этот шаг и просто заполним массив.
   *
   * @returns {Promise<void>}
   */
  const fakeGetItems = async () => {
    const items = [...Array(ITEMS_TOTAL)].map((_, index) => ({
      id: index,
      alt: `Элемент #${index}`
    }))
    setState(state => ({
      ...state,
      items: items
    }))
  }


  const handleScroll = e => {
    const {scrollTop} = e.target;

    // длина скролла: высота контейнера с элементами минус высота уже показанной области
    const scrollLength = gridRef.current.offsetHeight - e.target.offsetHeight;

    // задаём прозрачность фона
    setState(state => ({
      ...state,
      opacity: scrollTop/scrollLength
    }));

    // считаем текущую страницу
    setState(state => ({
      ...state,
      currentPage: Math.ceil(scrollTop / window.innerHeight) || 1
    }));
  };


  return (
    <div className={styles.body} style={{background: `rgba(0,0,0,${state.opacity})`}}>
      <div className={styles.body__container} onScroll={handleScroll}>

        <div className={styles.body__pages}>
          Page {state.currentPage} of {state.maxPage}
        </div>

        <div className={styles.body__grid} ref={gridRef}>

          {state.items.map(item => (
            <div key={item.id} className={styles.body__item}>
              <img src="https://via.placeholder.com/300" alt={item.alt} />
            </div>
          ))}

        </div>

      </div>
    </div>
  )

};


export default Demo;