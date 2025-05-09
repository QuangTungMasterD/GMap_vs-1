import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './SlideShow.module.scss';

const cx = classNames.bind(styles);

function SlideShow({ list }) {
    const [currentIndex, setCurrentIndex] = useState(0.0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
        }, 3000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div 
                className={cx('slide-list')} 
                style={{ transform: `translateY(-${(currentIndex / list.length) * 100}%)` }}
            >
                {list.map((item, i) => (
                    <div 
                        className={cx('slide-item')} 
                        style={{ backgroundImage: `url(${item.image})` }}
                        alt={`Slide ${i}`} 
                        key={i} 
                    >
                        <div className={cx('sub-wrapper')}>
                            <div className={cx('titles')}>
                                {item.imageTitle ? <img alt={item.imageTitle} src={item.imageTitle} className={cx('img-title')}/> : ''}
                                <div className={cx('title')}>{item.title}</div>
                                <div className={cx('desc')}>{item.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('control')}>
                
            </div>
        </div>
    );
}

export default SlideShow;