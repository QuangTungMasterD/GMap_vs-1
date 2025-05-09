import classNames from "classnames/bind";

import styles from './TitleWeb.module.scss'

const cx = classNames.bind(styles)

function TitleWeb({ item, primary, blue, small }) {
    return (
        <div className={cx('wrapper', {
            primary, blue, small
        })}>
            {item.imgLeft ? <div style={{ backgroundImage: `url(${item.image})` }} className={cx('img-title')}></div> : ''}
            <div className={cx('desc-title')}>
                <div className={cx('title')}>
                    {item.title}
                </div>
                <div className={cx('desc')}>
                    {item.desc}
                </div>
            </div>
            {item.imgRight ? <div style={{ backgroundImage: `url(${item.image})` }} className={cx('img-title')}></div> : ''}
            
        </div>
    );
}

export default TitleWeb;