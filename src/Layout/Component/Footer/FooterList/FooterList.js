import classNames from "classnames/bind";

import styles from './FooterList.module.scss'

const cx = classNames.bind(styles)

function FooterList({ list }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {list.header}
            </div>
            <div className={cx('title')}>
                {
                    list.titleList.map((item, i) => {
                        let prop = {}
                        if(item.link) {
                            prop = {
                                href: item.link,
                                target: "_blank"
                            }
                        }
                        return <a className={cx('link')} key={i} {...prop} rel="noreferrer">{item.title}</a>
                    })
                }
            </div>
        </div>
    );
}

export default FooterList;