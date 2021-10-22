<?php

class WorkspaceModel extends BaseModel
{

    public function getAllWorkspace($uid)
    {
        $sql = "SELECT * FROM workspaces where uid='$uid'";
        $workspace = $this->_query($sql);
        $data = [];
        while ($row = mysqli_fetch_assoc($workspace)) {
            array_push($data, $row);
        }
        return $data;
    }

    public function findWorkspaceById($id)
    {
        $sql = "SELECT * FROM workspaces where id='$id'";
        $createdWorkspace = $this->_query($sql);
        return mysqli_fetch_assoc($createdWorkspace);
    }

    public function createWorkspace($name, $uid)
    {
        $id = uniqid();
        $sql = "INSERT INTO workspaces (id, workspace_name, uid) values ('$id', '$name', '$uid')";
        $this->_query($sql);

        $createdWorkspace = $this->findWorkspaceById($id);
        return $createdWorkspace;
    }

    public function updateWorkspace($name, $uid, $wid)
    {
        $sql = "UPDATE workspaces set workspace_name='$name' where id='$wid' and uid='$uid'";
        $this->_query($sql);
        $updatedWorkspace = $this->findWorkspaceById($wid);
        return $updatedWorkspace;
    }

    public function deleteWorkspace($wid, $uid)
    {
        $sql = "DELETE from workspaces where id='$wid' and uid='$uid'";
        $this->_query($sql);
    }
}