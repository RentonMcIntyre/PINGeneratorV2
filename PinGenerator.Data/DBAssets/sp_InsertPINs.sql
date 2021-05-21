USE [PINStore]
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertPINs]    Script Date: 21/05/2021 10:22:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_InsertPINs]
   @pinList PINValue READONLY
AS
BEGIN
INSERT INTO [dbo].[PIN]
           (
				PinString,
				Allocated
		   )
SELECT			PinString,
				Allocated
FROM @pinList
END;