import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Paginator({ page, count, total, selectPageCallback }) {
  if (count === 0 || total <= 10) {
    return <div />;
  }

  const pages = Math.floor(total / count) + 1;
  let key = 0;
  return (
    <nav>
      <ul className="pagination">
        {[...Array(pages)].map((x, i) => {
          key += 1;
          return (
            <li className={`page-item${i === page ? ' active' : ''}`} key={key}>
              <button
                className="page-link"
                onClick={() => selectPageCallback(i)}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Paginator.propTypes = {
  page: PropTypes.number,
  count: PropTypes.number,
  total: PropTypes.number,
  selectPageCallback: PropTypes.func,
};

export default Paginator;
