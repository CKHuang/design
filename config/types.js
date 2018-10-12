
const PROJECT_TYPE = {
    [`PC`]: 1,
    [`H5`]: 2
}

const PAGE_SIZE = {
    [`${PROJECT_TYPE.PC}`]: {width:1024,height:960},
    [`${PROJECT_TYPE.H5}`]: {width:375,height:667}
}

export default {
    ADD: `ADD`,
    EDIT: `EDIT`,

    PROJECT_TYPE,
    PAGE_SIZE
}