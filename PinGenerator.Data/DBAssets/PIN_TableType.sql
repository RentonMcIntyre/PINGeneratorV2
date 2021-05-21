USE [PINStore]
GO

/****** Object:  UserDefinedTableType [dbo].[PINValue]    Script Date: 21/05/2021 10:23:36 ******/
CREATE TYPE [dbo].[PINValue] AS TABLE(
	[id] [int] NULL,
	[PinString] [varchar](4) NOT NULL,
	[Allocated] [bit] NOT NULL
)
GO


