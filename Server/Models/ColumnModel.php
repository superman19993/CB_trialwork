<?php
class ColumnModel extends BaseModel
{
    const TABLE = 'columns';

    public function getAll($select = ['*'], $orderBys = [], $limit = 15, $wid)
    {
        return $this->all(self::TABLE, $select, $orderBys, $limit, "workspaceid=$wid");
    }

    public function find($id)
    {
        return $this->getById(self::TABLE, $id);
    }

    public function store($data)
    {
        return $this->create(self::TABLE, $data);
    }

    public function updateData($id, $data)
    {
        return $this->update(self::TABLE, $id, $data);
    }
    public function destroy($id)
    {
        return $this->delete(self::TABLE, $id);
    }

    public function getAllCards($select = ['*'], $orderBys = [], $limit = 15)
    {
        return $this->all('cards', $select, $orderBys, $limit);
    }
}