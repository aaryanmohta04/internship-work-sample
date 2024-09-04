/*
-- Query: SELECT * FROM erp_db.module WHERE id > 232
LIMIT 0, 50000

-- Date: 2024-08-02 17:55

def replace_insert_statement(input_string):
    old_substring = 'INSERT INTO "" '
    new_substring = 'INSERT INTO "erp_db.module"'
    
    updated_string = input_string.replace(old_substring, new_substring)
    
    return updated_string

*/
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (233,'Inventory','inventory',NULL,214,1,'2024-08-02 12:57:49.287680','2024-08-02 12:57:49.287680');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (234,'Brands','brands',233,215,1,'2024-08-02 12:59:35.815423','2024-08-02 12:59:35.815423');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (235,'Brand View','brand-view',234,217,1,'2024-08-02 13:00:05.424683','2024-08-02 13:04:23.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (236,'Brand (Add/Edit)','brand-information',234,216,1,'2024-08-02 13:01:41.265609','2024-08-02 13:03:57.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (237,'Brand Delete','brand-delete',234,218,1,'2024-08-02 13:05:37.484501','2024-08-02 13:05:37.484501');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (238,'Models','models',233,219,1,'2024-08-02 13:07:31.429355','2024-08-02 13:07:31.429355');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (239,'Model View','model-view',238,220,1,'2024-08-02 13:11:55.105369','2024-08-02 13:11:55.105369');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (240,'Model (Add/Edit)','model-information',238,221,1,'2024-08-02 13:12:35.762057','2024-08-02 13:12:35.762057');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (241,'Model Delete','model-delete',238,222,1,'2024-08-02 13:12:52.531047','2024-08-02 13:12:52.531047');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (242,'Manufacturers','manufacturers',233,223,1,'2024-08-02 13:14:10.274561','2024-08-02 13:14:10.274561');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (243,'Manufacturer View','manufacturer-view',242,224,1,'2024-08-02 13:14:30.703882','2024-08-02 13:14:30.703882');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (244,'Manufacturer (Add/Edit)','manufacturer-information',242,225,1,'2024-08-02 13:15:09.261275','2024-08-02 13:15:09.261275');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (245,'Manufacturer Delete','manufacturer-delete',242,226,1,'2024-08-02 13:15:20.884212','2024-08-02 13:15:20.884212');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (246,'Classes','classes',233,227,1,'2024-08-02 13:16:33.376639','2024-08-02 13:16:33.376639');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (247,'Class View','class-view',246,228,1,'2024-08-02 13:17:08.864736','2024-08-02 13:17:08.864736');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (248,'Class (Add/Edit)','class-information',246,229,1,'2024-08-02 13:17:22.119461','2024-08-02 13:17:22.119461');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (249,'Class Delete','class-delete',246,230,1,'2024-08-02 13:17:36.101182','2024-08-02 13:17:36.101182');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (250,'Purchase','purchase',NULL,231,1,'2024-08-02 13:18:53.870859','2024-08-02 13:18:53.870859');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (251,'Vendors','vendors',250,232,1,'2024-08-02 13:19:21.413222','2024-08-02 13:19:21.413222');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (252,'Vendor View','vendor-view',251,233,1,'2024-08-02 13:19:44.110821','2024-08-02 13:19:44.110821');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (253,'Vendor (Add/Edit)','vendor-information',251,234,1,'2024-08-02 13:19:57.753338','2024-08-02 13:19:57.753338');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (254,'Vendor Delete','vendor-delete',251,235,1,'2024-08-02 13:20:08.713276','2024-08-02 13:20:08.713276');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (255,'Warehouse','warehouse',NULL,236,1,'2024-08-02 13:22:18.159790','2024-08-02 13:22:18.159790');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (256,'Stores','stores',255,237,1,'2024-08-02 13:23:05.908384','2024-08-02 13:23:05.908384');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (257,'Store View','store-view',256,238,1,'2024-08-02 13:23:25.422059','2024-08-02 13:23:25.422059');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (258,'Store (Add/Edit)','store-information',256,239,1,'2024-08-02 13:23:45.282988','2024-08-02 13:23:45.282988');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (259,'Store Delete','store-delete',256,240,1,'2024-08-02 13:23:59.936195','2024-08-02 13:23:59.936195');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (260,'Users','users',NULL,241,1,'2024-08-02 13:37:43.590939','2024-08-02 13:37:43.590939');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (264,'User List','user-list',260,245,1,'2024-08-02 13:39:50.403692','2024-08-02 13:39:50.403692');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (261,'User View','user-view',264,242,1,'2024-08-02 13:38:14.361398','2024-08-02 13:40:25.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (262,'User (Add/Edit)','user-information',264,243,1,'2024-08-02 13:38:30.896363','2024-08-02 13:40:29.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (263,'User Delete','user-delete',264,244,1,'2024-08-02 13:38:49.369346','2024-08-02 13:40:32.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (265,'Roles','roles',260,246,1,'2024-08-02 13:41:34.682578','2024-08-02 13:41:34.682578');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (266,'Role View','role-view',265,247,1,'2024-08-02 13:42:02.190645','2024-08-02 13:42:02.190645');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (267,'Role (Add/Edit)','role-information',265,248,1,'2024-08-02 13:42:16.461068','2024-08-02 13:42:16.461068');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (268,'Role Delete','role-delete',265,249,1,'2024-08-02 13:42:41.931914','2024-08-02 13:42:41.931914');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (269,'Permissions','permissions',260,250,1,'2024-08-02 13:44:20.209635','2024-08-02 13:44:20.209635');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (270,'Permission View','permission-view',269,251,1,'2024-08-02 13:44:35.466490','2024-08-02 13:44:35.466490');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (271,'Permission (Add/Edit)','permission-information',269,252,1,'2024-08-02 13:45:27.258920','2024-08-02 13:45:27.258920');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (272,'Permission Delete','permission-delete',269,253,1,'2024-08-02 13:45:40.593790','2024-08-02 13:45:40.593790');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (273,'Settings','settings',NULL,254,1,'2024-08-02 13:50:11.432839','2024-08-02 13:50:11.432839');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (274,'Szwholesale.net','szwholesale-net',273,255,1,'2024-08-02 13:51:33.330320','2024-08-02 13:51:33.330320');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (275,'Popular Brands','popularbrand',274,256,1,'2024-08-02 13:56:02.769547','2024-08-02 15:46:25.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (276,'Popular Brand View','popularbrand-view',275,257,1,'2024-08-02 14:03:24.445862','2024-08-02 15:46:45.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (277,'Popular Brand (Add/Edit)','popularbrand-information',275,258,1,'2024-08-02 14:04:34.110134','2024-08-02 15:47:02.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (278,'Popular Brand Delete','popularbrand-delete',275,259,1,'2024-08-02 14:04:49.639947','2024-08-02 15:47:17.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (279,'Banners','websitebanner',274,260,1,'2024-08-02 14:06:06.402271','2024-08-02 15:47:46.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (280,'Banner View','websitebanner-view',279,261,1,'2024-08-02 14:07:05.545737','2024-08-02 15:48:16.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (281,'Banner (Add/Edit)','websitebanner-information',279,262,1,'2024-08-02 14:07:36.880292','2024-08-02 15:48:31.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (282,'Banner Delete','websitebanner-delete',279,263,1,'2024-08-02 14:07:54.851394','2024-08-02 15:48:37.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (283,'New Arrivals','newarrivals',274,264,1,'2024-08-02 14:10:07.266266','2024-08-02 15:50:08.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (284,'New Arrival View','newarrivals-view',283,265,1,'2024-08-02 14:10:25.797202','2024-08-02 15:50:18.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (285,'New Arrival (Add/Edit)','newarrivals-information',283,266,1,'2024-08-02 14:11:02.449652','2024-08-02 15:50:24.000000');
INSERT INTO `` (`id`,`name`,`key`,`parentId`,`displayOrder`,`isVisible`,`createdDate`,`updatedDate`) VALUES (286,'New Arrival Delete','newarrivals-delete',283,267,1,'2024-08-02 14:11:14.596004','2024-08-02 15:50:34.000000');
