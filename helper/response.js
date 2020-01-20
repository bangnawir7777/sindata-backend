module.exports = (reg, res, next) => {
  res.success = ({code, message, data}) => {
       res.status(200).json({
           status: true,
           code: code || 200,
           message: message || "",
           data: data || {}
       });
   };
   res.error = ({code, message, data}) => {
     res.status(200).json({
         status: false,
         code: code || 200,
         message: message || "Oops, something wrong",
         data: data || {}
     });
   };
   next();
 }