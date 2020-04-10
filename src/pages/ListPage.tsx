import React from 'react';
import PageTemplate from '../components/common/PageTemplate';
import ListWrapper from '../components/list/ListWrapper';
import ListContainer from '../components/list/ListContainer';

/**
 * 
 * @param param0 
 * @description
 *  레프트박스만들기
 */

const ListPage  = ({page, tag}) => {
    // page의 기본 값을 1로 설정
    return (
        <PageTemplate>
            <ListWrapper>
                <ListContainer
                    // page={parseInt(page, 10)}
                    // tag={tag}
                />
            </ListWrapper>
        </PageTemplate>
    );
};


export default ListPage;