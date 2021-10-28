<?php
class CardModel extends BaseModel
{
    const TABLE = 'cards';

    public function store($data)
    {
        return $this->create(self::TABLE, $data);
    }

    public function updateData($id, $data)
    {
        return $this->update(self::TABLE, $id, $data);
    }

    public function findAll($select = ['*'], $orderBys = [], $limit = 100)
    {
        return $this->all(self::TABLE, $select, $orderBys, $limit);
    }

    public function find($id)
    {
        return $this->getById(self::TABLE, $id);
    }

    public function destroy($id)
    {
        return $this->delete(self::TABLE, $id);
    }

    public function changeCardForCol($cardId, $destColId)
    {
        $sql = "UPDATE cards set columnid='$destColId' where id='$cardId'";
        echo $sql;
        return $this->_query($sql);
    }
}