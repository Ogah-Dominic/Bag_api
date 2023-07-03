const BagModel = require('../Models/BagModel')
const fs = require('fs')
//create a  colletion
exports.newCollection = async (req,res)=>{
        const {brandName,color,price}=req.body
        const collectionData =({
            brandName,
            color,
            price,
            bagImage: req.file.filename,
        })
        try{
        const createdCollection = await BagModel.create(collectionData);
        if (createdCollection){
            res.status(201).json({
                message: "created sucessfully",
                data: createdCollection
            })
        }else{
            res.status(401).json({
                message: "not created."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//veiw all collection
exports.veiwAll = async (req, res)=>{
    try {
        const allRecords = await BagModel.find()
        if ( allRecords.length === 0 ) {
            res.status( 400 ).json( {
                message: "No Bags is available"
            })
        } else {
            res.status( 200 ).json( {
                message: "All Bags",
                data: allRecords,
                TOTALCOLLECTION: allRecords.length
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
//view a single bag
exports.SingleBag = async ( req, res ) => {
            try {
                const bagId = req.params.bagId;
                const bags = await BagModel.findById( bagId );
                if ( !bags ) {
                    res.status( 404 ).json( {
                        message: "No bag found."
                    })
                } else {
                    res.status( 200 ).json( {
                        data: bags
                    })
                }
            } catch ( e ) {
                res.status( 500 ).json( {
                    message: e.message
                })
            }
        }
    
exports.updateBag = async (req, res) => {
            const bagId = req.params.bagId;
            const bags = await BagModel.findById( bagId );
            try {
              const { brandName, color, price } = req.body;
              const Data = {
                brandName: brandName || bags.brandName,
                color: color || bags.color,
                price:price || bags.price,
                };
          
              // check if the bagImage  to be updated
              if (req.files && req.files["bagImage"]) {
                const oldbagImagePath = `uploads/${bags.bagImage}`;
                // Delete the old image if it exists
                if (fs.existsSync(oldbagImagePath)) {
                  fs.unlinkSync(oldbagImagePath);
                }
                Data.bagImage = req.files[ "bagImage" ][ 0 ].filename;
              }
          
              const updatedData = await BagModel.findByIdAndUpdate(
                bagId,
                Data,
                { new: true }
                );
              if (updatedData) {
                res.status(200).json({
                  message: 'Updated successfully',
                  data: updatedData,
                });
              } else {
                res.status(404).json({
                  message: 'Bags collection not found.',
                });
              }
            } catch (e) {
              res.status(500).json({
                message: e.message,
        });
    }
};

// delete a particular collection
exports.deleteCollection = async (req, res) => {
    const bagId = req.params.bagId;
    try {
      const bags = await BagModel.findById(bagId);
      if (!bags) {
        res.status(404).json({
          message: 'Bags not found.',
        });
      }
      const bagImagePath = `uploads/${bags.bagImage}`;
      if (fs.existsSync(bagImagePath)) {
        fs.unlinkSync(bagImagePath);
      }
      await BagModel.findByIdAndDelete(bagId);
      res.status(200).json({
        message: 'bag collection deleted successfully',
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  };