export default {
    [`project.data.json`]: (projectData) => {
        const json = {};
        const translater = (config,parent,key) => {
            const type = config.type,
                  value = config.value;
            if (type == 'number' || type == 'string') {
               parent[key] = value;
            } else if (type == 'array') {
                parent[key] = [];
                value.forEach((item,index) => {
                    translater(item,parent[key],index)
                })
            } else if (type == 'object') {
                parent[key] = {};
                value.forEach((item) => {
                    translater(item,parent[key],item.key)
                })
            }
        }
        projectData.forEach((item) => {
            translater(item,json,item.key)
        })
        return json
    }
}