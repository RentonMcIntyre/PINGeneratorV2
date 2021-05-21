USE [PINStore]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPINs]    Script Date: 21/05/2021 10:22:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_GetPINs]
   @requested INT
AS
BEGIN


DECLARE @updatedPINs TABLE 
         (id INT, PinString VARCHAR(4), Allocated BIT)

;WITH chosenPins AS (
	SELECT TOP (@requested) 
				id AS [id],
				PinString AS [PinString], 
				1 AS [Allocated] 
	FROM PIN
	WHERE Allocated = 0
	ORDER BY NEWID()
)


UPDATE p
	SET p.Allocated = cp.Allocated
OUTPUT cp.* 
INTO @updatedPINs
FROM PIN p 
INNER JOIN chosenPins cp
	ON p.PinString = cp.PinString


SELECT * 
FROM @updatedPINs 
ORDER BY NEWID()

END;