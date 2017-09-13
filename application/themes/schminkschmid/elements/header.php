<?php  
	defined('C5_EXECUTE') or die("Access Denied."); 
?>
<!DOCTYPE html>
<html lang="<?php echo Localization::activeLanguage()?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
	<?php
		$this->addHeaderItem(Loader::helper('html')->css('css/main.css'));
		Loader::element('header_required');
		if ($c->isEditMode()) {
			$this->addHeaderItem(Loader::helper('html')->css('css/edit.css'));
		}
	?>
	<script type="text/javascript" src="<?=ASSETS_URL_JAVASCRIPT?>/jquery.js"></script>
</head>
<body>
<div class="<?php echo $c->getPageWrapperClass()?>">
	<a href="<?php echo View::url('/'); ?>" title="Home"><aside id="logomob" class="logo"></aside></a>
	<header id="ss" class="">
		<a href="<?php echo View::url('/'); ?>" title="Home"><aside id="logo" class="logo"></aside></a>
		<aside class="navhead" onclick="document.getElementById('mainnav').classList.toggle('show');">NAVIGATION</aside>
		<nav class="mainnav" id="mainnav">
			<?php 	
				$bt = BlockType::getByHandle('autonav');
				$bt->controller->displayPages = 'top'; 
				$bt->controller->displayPagesCID = ''; 
				$bt->controller->orderBy = 'display_asc';  
				$bt->controller->displaySubPages = 'all'; 
				$bt->controller->displaySubPageLevels = 'all';
				$bt->controller->displaySubPageLevelsNum = '';
				$bt->render('view');
			?>
		</nav>
	</header>
	<section id="bgimage">
		<?php 
			$a = new Area ("Hintergrundbild");
			$a->display($c);
		?>
	</section>
