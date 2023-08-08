class EventorTypes
{
    static GetNewTask()
    {
        const task = {
            user: 0,
            action: 0,
            type: "",
            objects: [],
            where: [],
            order: "",
            setKey: "",
            limit: 0,
            offset: 0,
            postActions: [],
            results: [],
        };
        return task;
    }
}