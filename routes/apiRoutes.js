/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';
import MuseumStaff from '../models/MuseumStaff.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Museum App!');
});

/// /////////////////////////////////
/// ////Museum Staff Endpoints////////
/// /////////////////////////////////

// Museum Staff, Role, Location //
router.route('/museumStaffRole')
  .get(async (req, res) => {
    try {
      // const roles = await db.MuseumStaff.findAll({include: db.StaffRole});
      const roles = await db.MuseumStaff.findAll({
        include: [
          db.MuseumInfo,
          db.StaffRole
        ]
      });
      console.table(roles);
      const staffRoles = roles.map((role) => {
        console.log('role', role);
        const dataObject = {
          ...role.dataValues,
          ...role.staff_role.dataValues
        };
        delete dataObject.staff_role;
        return dataObject;
      });
      console.log(staffRoles);
      res.json({data: staffRoles});
    } catch (err) {
      console.error(err);
      res.json({message: err});
    }
  });

// Museum Staff and location //
// router.route('/museumStaffLocation')
//   .get(async (req, res) => {
//     try {
//       const names = await db.MuseumStaff.findAll({include: db.MuseumInfo});

//       const museumNames = names.map((name) => {
//         console.log('name', name);
//         const dataObject = {
//           ...name.dataValues,
//           ...name.Museum_info.dataValues
//         };
//         delete dataObject.Museum_info;
//         return dataObject;
//       });
//       console.log(museumNames);
//       res.json({data: museumNames});
//     } catch (err) {
//       console.error(err);
//       res.json({message: err});
//     }
//   });

router.get('/museum_staff', async (req, res) => {
  try {
    const staff = await db.MuseumStaff.findAll();
    const reply = staff.length > 0 ? { data: staff } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/museum_staff/:staff_id', async (req, res) => {
  try {
    const staff = await db.MuseumStaff.findAll({
      where: {
        staff_id: req.params.staff_id
      }
    });

    res.json(staff);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/museum_staff', async (req, res) => {
  const staff = await db.MuseumStaff.findAll({
    include: [
      db.MuseumInfo,
      db.StaffRole
    ]
  });
  const currentId = (await staff.length) + 1;
  try {
    const newStaff = await db.MuseumStaff.create({
      staff_id: currentId,
      employee_first_name: req.body.employee_first_name,
      employee_last_name: req.body.employee_last_name,
      museum_id: req.body.museum_id,
      role_id: req.body.role_id
    });
    res.json(newStaff);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/museum_staff/:staff_id', async (req, res) => {
  try {
    await db.MuseumStaff.destroy({
      where: {
        staff_id: req.params.staff_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/museum_staff', async (req, res) => {
  try {
    await db.MuseumStaff.update({
      include: [
        db.MuseumInfo,
        db.StaffRole
      ]
    },
    {
      employee_first_name: req.body.employee_first_name,
      employee_last_name: req.body.employee_last_name,
      role_id: req.body.role_id,
      museum_name: req.body.museum_name
    },
    {
      where: {
        staff_id: req.body.staff_id
      }
    });
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////Staff Role Endpoints////////
/// /////////////////////////////////
router.get('/staff_role', async (req, res) => {
  try {
    const role = await db.StaffRole.findAll();
    const reply = role.length > 0 ? { data: role } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/staff_role/:role_id', async (req, res) => {
  try {
    const role = await db.StaffRole.findAll({
      where: {
        role_id: req.params.role_id
      }
    });

    res.json(role);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/staff_role', async (req, res) => {
  const role = await db.StaffRole.findAll();
  const currentId = (await role.length) + 1;
  try {
    const newRole = await db.StaffRole.create({
      role_id: currentId,
      role_title: req.body.role_title
    });
    res.json(newRole);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/staff_role/:role_id', async (req, res) => {
  try {
    await db.StaffRole.destroy({
      where: {
        role_id: req.params.role_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/staff_role', async (req, res) => {
  try {
    await db.StaffRole.update(
      {
        role_id: req.body.role_id,
        role_title: req.body.role_title
      },
      {
        where: {
          role_id: req.body.role_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////Museum Info Endpoints////////
/// /////////////////////////////////
router.get('/Museum_info', async (req, res) => {
  try {
    const museum = await db.MuseumInfo.findAll();
    const museumInfo = museum.length > 0 ? { data: museum } : { message: 'no results found' };
    res.json(museumInfo);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/Museum_info/:museum_id', async (req, res) => {
  try {
    const museumID = await db.MuseumInfo.findAll({
      where: {
        museum_id: req.params.museum_id
      }
    });

    res.json(museumID);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/Museum_info', async (req, res) => {
  const museum = await db.MuseumInfo.findAll();
  const currentMuseumId = (await museum.length) + 1;
  try {
    const newMuseum = await db.MuseumInfo.create({
      museum_id: currentMuseumId,
      museum_name: req.body.museum_name,
      museum_email: req.body.museum_email,
      museum_url: req.body.museum_url,
      museum_phone_num: req.body.museum_phone_num,
      museum_entry_fee: req.body.museum_entry_fee,
      museum_open_time: req.body.museum_open_time,
      date_museum_opened: req.body.date_museum_opened,
      museum_capacity: req.body.museum_capacity,
      museum_size: req.body.museum_size,
      museum_parent: req.body.museum_parent,
      museum_close_time: req.body.museum_close_time,
      museum_budget: req.body.museum_budget,
      museum_address: req.body.museum_address,
      museum_city: req.body.museum_city,
      museum_zipcode: req.body.museum_zipcode,
      ada_id: req.body.ada_id
    });
    res.json(newMuseum);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/Museum_info/:museum_id', async (req, res) => {
  try {
    await db.MuseumInfo.destroy({
      where: {
        museum_id: req.params.museum_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/Museum_info', async (req, res) => { // Where I left off 19:18 4/6/2021
  try {
    await db.MuseumInfo.update(
      {
        museum_name: req.body.museum_name,
        museum_email: req.body.museum_email,
      	museum_url: req.body.museum_url,
        museum_phone_num: req.body.museum_phone_num,
        museum_entry_fee: req.body.museum_entry_fee,
        museum_open_time: req.body.museum_open_time,
        date_museum_opened: req.body.date_museum_opened,
        museum_capacity: req.body.museum_capacity,
        museum_size: req.body.museum_size,
        museum_parent: req.body.museum_parent,
        museum_close_time: req.body.museum_close_time,
        museum_budget: req.body.museum_budget,
        museum_address: req.body.museum_address,
        museum_city: req.body.museum_city,
        museum_zipcode: req.body.museum_zipcode,
        ada_id: req.body.ada_id
      },
      {
        where: {
          museum_id: req.body.museum_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////Visitor Endpoints////////
/// /////////////////////////////////

router.route('/visitTransactions')
  .get(async (req, res) => {
    try {
      // const roles = await db.MuseumStaff.findAll({include: db.StaffRole});
      const transactions = await db.MuseumVisits.findAll({
        include: [
          db.Visitors,
          db.MuseumInfo,
          db.VisitorTransactions
        ]
      });
      console.table(transactions);
      const visTransaction = transactions.map((transaction) => {
        console.log('transaction', transaction);
        const dataObject = {
          ...transaction.dataValues,
          ...transaction.visitor_transaction.dataValues
        };
        delete dataObject.visitor_transaction;
        return dataObject;
      });
      console.log(visTransaction);
      res.json({data: visTransaction});
    } catch (err) {
      console.error(err);
      res.json({message: err});
    }
  });

router.route('/wholeVisitor')
  .get(async (req, res) => {
    try {
      const visitor = await db.Visitors.findAll();
      const visitorTrans = await db.VisitorTransactions.findAll();
      const wholeVisitors = visitor.map((visit) => {
        const transEntry = visitorTrans.find((trans) => trans.visitor_id === visit.visitor_id);
        console.log('visit', visit);
        console.log('transEntry', transEntry);
        return {
          ...visit.dataValues,
          ...transEntry.dataValues
        };
      });
      res.json({data: wholeVisitors});
    } catch (err) {
      console.error(err);
      res.json({message: 'something went wrong on the server!'});
    }
  });

router.get('/visitors', async (req, res) => {
  try {
    const visitors = await db.Visitors.findAll();
    const reply = visitors.length > 0 ? {data: visitors} : {message: 'no results found'};
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/visitors/:visitor_id', async (req, res) => {
  try {
    const visitors = await db.Visitors.findAll({
      where: {
        visitor_id: req.params.visitor_id
      }
    });

    res.json(visitors);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/visitors', async (req, res) => {
  const visitors = await db.Visitors.findAll();
  const curId = (await visitors.length) + 1;
  try {
    const newVisitor = await db.Visitors.create({
      visitor_id: curId,
      visitor_fn: req.body.vistor_fn,
      visitor_ln: req.body.visitor_ln,
      visitor_phone_num: req.body.visitor_phone_num,
      visitor_email: req.body.visitor_email
    });
    res.json(newVisitor);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/visitors/:visitor_id', async (req, res) => {
  try {
    await db.Visitors.destroy({
      where: {
        visitor_id: req.params.visitor_id
      }
    });
    res.send('Successfully deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/visitors', async (req, res) => {
  try {
    await db.Visitors.update(
      {
        visitor_phone_num: req.body.visitor_phone_num,
        visitor_email: req.body.visitor_email
      },
      {
        where: {
          visitor_id: req.body.visitor_id
        }
      }
    );
    res.send('Successfully updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////Visitor Transaction Endpoints////////
/// /////////////////////////////////

// router.route('/museumTrans')
//   .get(async (req, res) => {
//     try {
//     // const visitor = await db.Visitors.findAll();
//       const visitorTrans = await db.VisitorTransactions.findAll();
//       const museumVisit = await db.MuseumVisits.findAll();
//       const museumInfo = await db.MuseumInfo.findAll();
//       const museumInfoVisit = museumInfo.map((name) => {
//         const transEntry = musuemVisit.find((visit) => visit.museum_id === name.museum_id);
//         console.log('visit', visit);
//         console.log('transEntry', transEntry);
//         return {
//           ...visit.dataValues,
//           ...transEntry.dataValues
//         };
//       });
//       const MuseumTrans = museumInfoVisit.find((info) => {
//         const visTransEntry = visitorTrans.map((trans) => info.visitor_id === trans.visitor_id);
//         console.log('info', info);
//         console.log('visTransEntry', visTransEntry);
//         return {
//           ...info.dataValues,
//           ...visTransEntry.dataValues
//         };
//       });

//       res.json({data: museumTrans});
//     } catch (err) {
//       console.error(err);
//       res.json({message: 'something went wrong on the server!'});
//     }
//   });

router.get('/visitor_transaction', async (req, res) => {
  try {
    const visTran = await db.VisitorTransactions.findAll();
    const reply = visTran.length > 0 ? {data: visTran} : {message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/visitor_transaction/:transaction_id', async (req, res) => {
  try {
    const visTranID = await db.VisitorTransactions.findAll({
      where: {
        transaction_id: req.params.transaction_id
      }
    });
    res.json(visTranID);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('visitor_transaction', async (req, res) => {
  const visTran = await db.VisitorTransactions.findAll();
  const curId = (await visTran.length) + 1;
  try {
    const newVisTran = await db.VisitorTransactions.create({
      transaction_id: curId,
      visitor_id: req.body.visitor_id,
      visitor_transactions: req.body.visitor_transactions
    });
    res.json(newVisTran);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/visitor_transaction/:transaction_id', async (req, res) => {
  try {
    await db.VisitorTransactions.destroy({
      where: {
        transaction_id: req.params.transaction_id
      }
    });
    res.send('Successfully deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/visitor_transaction', async (req, res) => {
  try {
    await db.VisitorTransactions.update(
      {
        visitor_transactions: req.body.visitor_transactions,
        visitor_id: req.body.visitor_id
      },
      {
        where: {
          transaction_id: req.body.transaction_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// //////////////////////////////////
/// ///////Custom Client Query Endpoint////////
/// /////////////////////////////////

const museumStaffCustom = 'SELECT (`employee_first_name`.`employee_last_name`.`staff_id`) FROM(`museum_staff`) WHERE (`staff_id > 5 AND staff_id < 17`)';
router.get('/museum_staff', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(museumStaffCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////Ada Compliance Endpoints////////
/// /////////////////////////////////
router.get('/ada_compliance', async (req, res) => {
  try {
    const ada = await db.AdaCompliance.findAll();
    const reply = ada.length > 0 ? { data: ada } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/ada_compliance/:ada_id', async (req, res) => {
  try {
    const ada = await db.AdaCompliance.findAll({
      where: {
        ada_id: req.params.ada_id
      }
    });

    res.json(ada);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/ada_compliance', async (req, res) => {
  const ada = await db.AdaCompliance.findAll();
  const currentId = (await ada.length) + 1;
  try {
    const newAda = await db.AdaCompliance.create({
      ada_id: currentId,
      ada_type: req.body.ada_type
    });
    res.json(newAda);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/ada_compliance/:ada_id', async (req, res) => {
  try {
    await db.AdaCompliance.destroy({
      where: {
        ada_id: req.params.ada_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/ada_compliance', async (req, res) => {
  try {
    await db.AdaCompliance.update(
      {
        ada_id: req.body.ada_id,
        ada_type: req.body.ada_type
      },
      {
        where: {
          ada_id: req.body.ada_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

/// /////////////////////////////////
/// ////////Museum Visits Endpoints//////////
/// /////////////////////////////////
router.get('/museum_visits', async (req, res) => {
  try {
    const visit = await db.MuseumVisits.findAll();
    const reply = visit.length > 0 ? { data: visit } : { message: 'no results found' };
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.get('/museum_visits/:visitor_id', async (req, res) => {
  try {
    const visit = await db.MuseumVisits.findAll({
      where: {
        visitor_id: req.params.visitor_id
      }
    });

    res.json(visit);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.post('/museum_visits', async (req, res) => {
  const visit = await db.MuseumVisits.findAll();
  const currentId = (await visit.length) + 1;
  try {
    const newVisit = await db.MuseumVisits.create({
      vistor_id: currentId,
      museum_id: req.body.museum_id,
      visit_date: req.body.visit_date,
      member_status: req.body.member_status
    });
    res.json(newVisit);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.delete('/museum_visits/:visitor_id', async (req, res) => {
  try {
    await db.MuseumVisits.destroy({
      where: {
        visitor_id: req.params.visitor_id
      }
    });
    res.send('Successfully Deleted');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

router.put('/museum_visits', async (req, res) => {
  try {
    await db.MuseumVisits.update(
      {
        visitor_id: req.body.visitor_id,
        museum_id: req.body.museum_id,
        visit_date: req.body.visit_date,
        member_status: req.body.member_status
      },
      {
        where: {
          visitor_id: req.body.visitor_id
        }
      }
    );
    res.send('Successfully Updated');
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;
