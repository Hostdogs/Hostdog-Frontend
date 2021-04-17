import React from 'react'
import { Container } from 'reactstrap'
import FilterOptionPane from './FilterOptionPane'
import SearchBox from './SearchBox'
export default function FilterOption() {
    return (
        <div>
            <Container>
                <SearchBox/>
                <FilterOptionPane/>
            </Container>
            
        </div>
    )
}
