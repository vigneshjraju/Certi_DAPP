pragma solidity ^0.8.28;


contract Cert {
    struct Certificate {
        string name;
        string course;
        string grade;
        string date;
    }

    address admin;

    event Issued(string indexed,uint256, string);

    mapping(address => bool) public admins;

    constructor(){
        admin=msg.sender;
    }

    modifier onlyAdmin(){
        require(admin==msg.sender,"Unauthorized Access !! ");
        _;
    }

    mapping(uint256 => Certificate) public Certificates;

    function issue (uint256 _id,
                    string memory _name,
                    string memory _course ,
                    string memory _grade,
                    string memory _date
    )public onlyAdmin {
        Certificates[_id]=Certificate(_name,_course,_grade,_date);
        emit Issued(_course,_id,_grade);
    }

    function getCertificate(uint256 _id) public view returns (string memory, string memory, string memory, string memory) {
        Certificate memory cert = Certificates[_id];
        return (cert.name, cert.course, cert.grade, cert.date);
    }   


    // Add a new admin (only by current admin)
    function addAdmin(address newAdmin) public onlyAdmin {
        admins[newAdmin] = true;
    }

    // Remove an admin (only by current admin)
    function removeAdmin(address _admin) public onlyAdmin {
        require(_admin != msg.sender, "You can't remove yourself");
        admins[_admin] = false;
    }


}